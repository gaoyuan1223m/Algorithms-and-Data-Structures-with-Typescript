npx node devDependencies.js

[string[]] $dependencies = (Get-Content -Path './dependencies.txt') -split ','

foreach ($dependency in $dependencies) {
    npx npm i -D "$dependency"
}

