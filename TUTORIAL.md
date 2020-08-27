This tutorial assumes you know the basics of nuxtJS, and as such VueJS and JavaScript; especially about mixins and the static directory.  

Ce tutoriel part du principe que vous connaissez les bases de nuxtJS, par extension de VueJS et de JavaScript; particulièrement à propos des mixins et du répertoire static.
# Use native C code in NuxtJS:
- install emcc ([Emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html "Emscripten documentation")) and check that you have awk installed
- Put your C files in a directory named wasm at the root of your project
- Create a "mixin_generation.awk" file containing this code :
```awk
function get_type(param)
{
    sub(/(\s|\*)\w*/, "", param);
    gsub(/\s/, "", param);
    if (param == "char" || param == "char*") {
        return "'string'";
    } else if (param == "void") {
        return "null";
    } else
        return "'number'";
}

function treat_function()
{
    params_str = $0;
    name = $0;
    return_type = $0;

    sub(/(\s|\*)\w+.*/, "", return_type);
    return_type = get_type(return_type);
    gsub(/(.*\()|(\).*)/, "", params_str);
    gsub(/*/, "", name);
    sub(/\w+\s/, "", name);
    sub(/\(.*/, "", name);
    gsub(/\s/, "", name);
    split(params_str, params_array, /\s*,\s*/);

    printf "\t\t\t\t\"%s\": Module.cwrap('%s', %s, [", name, name, return_type;
    for (idx in params_array) {
        elem = params_array[idx];
        elem = get_type(elem);
        params_array[idx] = elem;
        if (params_array[idx + 1]) {
            printf "%s, ", params_array[idx];
        } else {
            printf "%s", params_array[idx];
        }
    }
    print "]),";
}

BEGIN { print "export default {\n\tmethods: {\n\t\textractModule() {\n\t\t\treturn {" }
/\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { treat_function(); }
END { print "\t\t\t}\n\t\t}\n\t},\n}" }
```
- Create a file named "compile.sh" containing this code :
```bash
#!/bin/env/bash
cd static
emcc ../wasm/*.c -o glue.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..
awk -f mixin_generation.awk wasm/*.c > mixins/extractWasm.js
echo "- DONE -"
```
- Make sure you have both the "static" and the "mixins" directory in your project, then launch the bash script
- Import the created "extractWasm.js" file wherever you need and use its extractModule method that returns an object containing every C method there was in your wasm folder

This method allows most of the C language's features to work. To learn more about the limits of this code, consult Emscripten's documentation [documentation Emscripten](https://emscripten.org/docs/getting_started "Emscripten documentation"). If you have any question about the code shown here, e-mail me at alec.ferrari.pro@gmail.com .

# Utiliser du code natif en C avec NuxtJS
- installez emcc ([Emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html "Emscripten documentation")) et vérifiez que vous avez awk déjà installé
- Placez tous vos fichiers .c dans un dossier appelé "wasm" à la racine du projet
- Créez un fichier "mixin_generation.awk" contenant ce code :
```awk
function get_type(param)
{
    sub(/(\s|\*)\w*/, "", param);
    gsub(/\s/, "", param);
    if (param == "char" || param == "char*") {
        return "'string'";
    } else if (param == "void") {
        return "null";
    } else
        return "'number'";
}

function treat_function()
{
    params_str = $0;
    name = $0;
    return_type = $0;

    sub(/(\s|\*)\w+.*/, "", return_type);
    return_type = get_type(return_type);
    gsub(/(.*\()|(\).*)/, "", params_str);
    gsub(/*/, "", name);
    sub(/\w+\s/, "", name);
    sub(/\(.*/, "", name);
    gsub(/\s/, "", name);
    split(params_str, params_array, /\s*,\s*/);

    printf "\t\t\t\t\"%s\": Module.cwrap('%s', %s, [", name, name, return_type;
    for (idx in params_array) {
        elem = params_array[idx];
        elem = get_type(elem);
        params_array[idx] = elem;
        if (params_array[idx + 1]) {
            printf "%s, ", params_array[idx];
        } else {
            printf "%s", params_array[idx];
        }
    }
    print "]),";
}

BEGIN { print "export default {\n\tmethods: {\n\t\textractModule() {\n\t\t\treturn {" }
/\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { treat_function(); }
END { print "\t\t\t}\n\t\t}\n\t},\n}" }
```
- Créez un fichier nommé "compile.sh" contenant ce code :
```bash
#!/bin/env/bash
cd static
emcc ../wasm/*.c -o glue.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..
awk -f mixin_generation.awk wasm/*.c > mixins/extractWasm.js
echo "- DONE -"
```
- Assurez-vous d'avoir les dossiers "mixins" et "static" présents dans votre projet puis lancez le script bash
- Importez le fichier "extractWasm.js" créé et utilisez sa méthode "extractModule" pour récupérer un objet contenant toutes les fonctions provenant du C utilisables directement.

Cette méthode permet d'utiliser la majorité des fonctionnalités du langage C. Pour en apprendre plus sur les limites, consultez la [documentation Emscripten](https://emscripten.org/docs/getting_started "Emscripten documentation"). Pour toutes questions sur le code fourni ici, n'hésitez pas à envoyer un mail à alec.ferrari.pro@gmail.com .