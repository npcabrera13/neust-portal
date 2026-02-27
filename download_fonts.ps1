$baseUrl = "http://58.69.126.78:84/enroll/"
$assets = @(
    "fonts/poppins/Poppins-Regular.ttf",
    "fonts/poppins/Poppins-Medium.ttf",
    "fonts/poppins/Poppins-Bold.ttf",
    "fonts/poppins/Poppins-SemiBold.ttf",
    "fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2",
    "fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff",
    "fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf",
    "fonts/iconic/fonts/Material-Design-Iconic-Font.woff2",
    "fonts/iconic/fonts/Material-Design-Iconic-Font.woff",
    "fonts/iconic/fonts/Material-Design-Iconic-Font.ttf"
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
