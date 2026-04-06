$targetDir = Get-Location
$items = Get-ChildItem -Path $targetDir -Directory | Where-Object { $_.Name -like "yapi-*" }
$count = 0

foreach ($item in $items) {
    $count++
    $oldPath = $item.FullName
    $newName = "xspace-$count"
    $newPath = Join-Path $targetDir $newName
    
    # Check if new path exists
    if (Test-Path $newPath) {
        Write-Host "⚠️  Skipped: New folder $newName already exists"
        continue
    }
    
    try {
        Rename-Item -Path $oldPath -NewName $newName -Force
        Write-Host "✅ Renamed successfully: $($item.Name) → $newName"
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)"
    }
}

Write-Host "`n🎉 All done! Renamed $count folders"
