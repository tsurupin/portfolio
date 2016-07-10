require('shelljs/global')

if (test('-d', 'dist')) {
  exec('node dist/generate-features.js')
  console.log('caniuse-api: Generation ok')
}
else {
  console.log('caniuse-api: No generation')
}
