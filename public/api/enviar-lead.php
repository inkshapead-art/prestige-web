<?php
/**
 * Este archivo va en: public/api/enviar-lead.php
 * Astro lo copia tal cual (sin procesarlo) a dist/api/enviar-lead.php al hacer build,
 * así que no necesitas subirlo por separado: viaja junto con el resto del sitio.
 *
 * Al desplegar en cPanel, queda accesible en:
 * https://tu-dominio.com/api/enviar-lead.php
 */

// ---- Configuración ----
// Reemplaza con tu URL real del webhook de GoHighLevel.
$GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/D7YYnJM9S0clNWP1m1cG/webhook-trigger/dd365ab5-009c-4000-9ecd-353c7409a8c3';

// Cambia esto por tu dominio real en producción (sin barra final).
// Mientras pruebas puedes dejarlo en '*', pero NO lo dejes así en producción.
$ALLOWED_ORIGIN = 'https://prestigegrowthpartners.com/';

// ---- Cabeceras ----
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: $ALLOWED_ORIGIN");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// El navegador puede mandar una petición OPTIONS antes del POST real (CORS preflight).
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// ---- Leer el body como JSON ----
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit;
}

function clean($value): string
{
    if (!is_string($value)) {
        return '';
    }
    return trim(strip_tags($value));
}

// ---- Arma el payload que se manda al CRM ----
// Conserva las respuestas actuales y agrega los datos de atribución.
$answerFields = [
    'servicesType',
    'area',
    'zip',
    'name',
    'businessRegistration',
    'businessAge',
    'businessBankAccount',
    'businessIndustry',
    'businessName',
    'capitalNeeded',
    'capitalPurpose',
    'creditScore',
    'email',
    'firstName',
    'lastName',
    'monthlyRevenue',
    'phone',
];

$payload = [];
foreach ($answerFields as $field) {
    if (array_key_exists($field, $data)) {
        $payload[$field] = clean($data[$field]);
    }
}

// Conserva el nombre completo y deriva nombre y apellido para los campos del CRM.
$fullName = clean($data['name'] ?? '');
$firstName = clean($data['firstName'] ?? '');
$lastName = clean($data['lastName'] ?? '');

if ($fullName === '') {
    $fullName = trim($firstName . ' ' . $lastName);
}

$nameParts = preg_split('/\s+/', $fullName, 2);
if ($firstName === '') {
    $firstName = $nameParts[0] ?? '';
}
if ($lastName === '') {
    $lastName = $nameParts[1] ?? '';
}

$payload['name'] = $fullName;
$payload['firstName'] = $firstName;
$payload['lastName'] = $lastName;

$utmSource = clean($data['utm_source'] ?? '');
$utmMedium = clean($data['utm_medium'] ?? '');
$metaSources = ['facebook', 'instagram', 'fb', 'ig'];
$isMetaLead = strtolower($utmMedium) === 'paid_social'
    || in_array(strtolower($utmSource), $metaSources, true);
$submittedAt = gmdate('c');

$payload += [
    'utm_source'   => $utmSource,
    'utm_medium'   => $utmMedium,
    'utm_campaign' => clean($data['utm_campaign'] ?? ''),
    'utm_content'  => clean($data['utm_content'] ?? ''),
    'utm_term'     => clean($data['utm_term'] ?? ''),
    'landing_page' => clean($data['landing_page'] ?? ''),
    'submitted_at' => $submittedAt,
    // Conserva el nombre anterior por compatibilidad con el webhook existente.
    'submittedAt'  => $submittedAt,
    'source'       => $isMetaLead ? 'Meta Ads' : clean($data['source'] ?? ''),
];

// ---- Validación mínima en servidor (no confíes solo en la del cliente) ----
$requiredFields = [
    'businessRegistration',
    'businessAge',
    'capitalNeeded',
    'capitalPurpose',
    'creditScore',
    'email',
    'name',
    'firstName',
    'lastName',
    'phone',
];

foreach ($requiredFields as $field) {
    if (($payload[$field] ?? '') === '') {
        http_response_code(422);
        echo json_encode(['error' => 'Faltan campos requeridos']);
        exit;
    }
}

if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Correo electrónico inválido']);
    exit;
}

// El teléfono ya llega en formato E.164 (+51987654321) desde el formulario.
if (!preg_match('/^\+[1-9]\d{6,14}$/', $payload['phone'])) {
    http_response_code(422);
    echo json_encode(['error' => 'Teléfono inválido']);
    exit;
}

// ---- Reenviar al webhook de GoHighLevel ----
$ch = curl_init($GHL_WEBHOOK_URL);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$ghlResponse = curl_exec($ch);
$httpCode    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError   = curl_error($ch);
curl_close($ch);

if ($ghlResponse === false) {
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo contactar al CRM', 'detail' => $curlError]);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(502);
    echo json_encode([
        'error'  => 'El CRM respondió con error',
        'status' => $httpCode,
    ]);
}
