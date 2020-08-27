#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

void say_hi(void)
{
    printf("Hello World!\n");
}

int return_forty_two(void)
{
    return (42);
}

void createJson(void)
{
    FILE *file_stream = fopen("test.json", "w");
    fprintf(file_stream, "{\"test\": true, \"message\": \"Hello World!\"}");
    fclose(file_stream);
}

#ifdef __cplusplus
}
#endif