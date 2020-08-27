#include <stdio.h>
#include <stdlib.h>

#ifdef __cplusplus
extern "C" {
#endif

char *testInteger(void)
{
    return 5;
}

int add(int a, int b)
{
    printf("a + b = %d", a + b);
    return (a + b);
}

#ifdef __cplusplus
}
#endif