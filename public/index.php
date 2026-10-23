<?php
/**
 * Punitdhan Pulses Limited - Production PHP Web Hosting Entry Point
 */

// Auto-heal Windows backslash filenames if extracted on Linux
$currentDir = __DIR__;
if (!is_dir($currentDir . '/assets')) {
    $entries = @scandir($currentDir);
    if ($entries) {
        foreach ($entries as $entry) {
            if (strpos($entry, '\\') !== false) {
                $targetRel = str_replace('\\', '/', $entry);
                $targetFull = $currentDir . '/' . $targetRel;
                $targetDir = dirname($targetFull);
                if (!is_dir($targetDir)) {
                    @mkdir($targetDir, 0755, true);
                }
                @rename($currentDir . '/' . $entry, $targetFull);
            }
        }
    }
}

// Diagnostic endpoint
if (isset($_GET['debug']) && $_GET['debug'] === '1') {
    header('Content-Type: application/json; charset=UTF-8');
    $entries = scandir($currentDir);
    $assetsPath = $currentDir . '/assets';
    $assetsExists = is_dir($assetsPath);
    $assetsFiles = $assetsExists ? scandir($assetsPath) : [];
    
    echo json_encode([
        'current_dir' => $currentDir,
        'assets_exists' => $assetsExists,
        'assets_files' => $assetsFiles,
        'index_html_exists' => file_exists($currentDir . '/index.html'),
        'htaccess_exists' => file_exists($currentDir . '/.htaccess'),
    ], JSON_PRETTY_PRINT);
    exit;
}

// Define path to the pre-rendered SPA index.html
$htmlFile = __DIR__ . '/index.html';

if (file_exists($htmlFile)) {
    // Deliver optimal security and MIME headers
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Content-Type: text/html; charset=UTF-8');

    // Stream the production HTML file directly to client
    readfile($htmlFile);
    exit;
} else {
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Punitdhan Pulses Limited Web Portal is ready. Please ensure production assets are compiled to this directory.';
    exit;
}
