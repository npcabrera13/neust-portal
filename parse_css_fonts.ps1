$cssFiles = Get-ChildItem -Path "C:\Users\liuxs\.gemini\antigravity\scratch\website_copy" -Recurse -Filter "*.css"
$fontUrls = @()

foreach ($file in $cssFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $matches = [regex]::Matches($content, 'url\((.*?)\)')
    foreach ($match in $matches) {
        $url = $match.Groups[1].Value.Trim("'", '"')
        if ($url -match '\.(woff|woff2|ttf|eot|svg)(\?.*)?$') {
            $fontUrls += $url
        }
    }
}

$fontUrls | Select-Object -Unique
