#!/bin/env/zsh
cd static
emcc ../wasm/*.c -o glue.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..
awk -f mixin_generation.awk wasm/*.c > mixins/extractWasm.js
echo "- DONE -"