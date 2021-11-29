import * as z from 'zod';
export declare const configSChema: z.ZodObject<{
    initial: z.ZodOptional<z.ZodUndefined>;
    states: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>, Record<string, any>, Record<string, any>>, Record<string, any>, Record<string, any>>;
    context: z.ZodOptional<z.ZodUndefined>;
}, "strip", z.ZodTypeAny, {
    initial?: undefined;
    context?: undefined;
    states: Record<string, any>;
}, {
    initial?: undefined;
    context?: undefined;
    states: Record<string, any>;
}>;
export declare const optionsSchema: z.ZodObject<{
    actions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>>;
}, "strip", z.ZodTypeAny, {
    actions?: Record<string, any> | undefined;
}, {
    actions?: Record<string, any> | undefined;
}>;
