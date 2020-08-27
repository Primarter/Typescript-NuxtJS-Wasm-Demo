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

BEGIN { print "import { Component, Vue } from 'nuxt-property-decorator'\nimport Module from '@/static/glue'\n@Component\nclass ExtractWasm extends Vue {\n\tpublic extractModule() {\n\t\treturn {" }
/\w+\s((\s|\*)*)\w+\(((\w+\s([\s\*]*),*)*)|void\)\s*{/ { treat_function(); }
END { print "\t\t}\n\t}\n}\nexport default ExtractWasm" }