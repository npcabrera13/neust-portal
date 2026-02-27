$baseUrl = "http://58.69.126.78:84/enroll/"
$assets = @(
    "images/icon.ico",
    "vendor/bootstrap/css/bootstrap.css",
    "fonts/font-awesome-4.7.0/css/font-awesome.min.css",
    "fonts/iconic/css/material-design-iconic-font.min.css",
    "vendor/animate/animate.css",
    "vendor/css-hamburgers/hamburgers.min.css",
    "vendor/animsition/css/animsition.min.css",
    "vendor/select2/select2.min.css",
    "vendor/daterangepicker/daterangepicker.css",
    "css/util_admission.css",
    "css/main_admission.css",
    "css/uploadfile.css",
    "scripts/jquery-1.9.1.js",
    "scripts/jquery.uploadfile.min.js",
    "scripts/tinybox.js",
    "scripts/settings.js",
    "scripts/sweetalert.min.js",
    "images/neust_logo.png",
    "images/loading_image.gif",
    "images/processing.gif",
    "vendor/jquery/jquery-3.2.1.min.js",
    "vendor/animsition/js/animsition.min.js",
    "vendor/bootstrap/js/popper.js",
    "vendor/bootstrap/js/bootstrap.min.js",
    "vendor/select2/select2.min.js",
    "vendor/daterangepicker/moment.min.js",
    "vendor/daterangepicker/daterangepicker.js",
    "vendor/countdowntime/countdowntime.js",
    "js/main.js"
)

foreach ($asset in $assets) {
    $url = $baseUrl + $asset
    $outputFile = Join-Path "C:\Users\liuxs\.gemini\antigravity\scratch\website_copy" $asset
    
    $dir = Split-Path $outputFile
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputFile
        Write-Host "Downloaded: $asset"
    } catch {
        Write-Host "Failed to download: $asset" -ForegroundColor Red
    }
}
