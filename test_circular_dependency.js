// Test script to check circular dependency issue
console.log('Testing circular dependency...');
try {
  const syncModel = require('./exts/yapi-plugin-swagger-auto-sync/syncModel');
  console.log('✓ syncModel loaded successfully');
  
  const SyncUtils = require('./exts/yapi-plugin-swagger-auto-sync/interfaceSyncUtils');
  console.log('✓ interfaceSyncUtils loaded successfully');
  
  console.log('\n🎉 Circular dependency issue appears to be resolved!');
} catch (error) {
  console.error('✗ Error loading modules:', error);
  console.error('\n⚠️  Circular dependency issue still exists');
}