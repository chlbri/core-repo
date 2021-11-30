import * as z from 'zod';
import { MachineConfigCRUD } from '..';
export declare const configSChema: <C extends z.ZodTypeAny, E extends z.ZodTypeAny>(context: C, event: E) => z.ZodType<MachineConfigCRUD<z.TypeOf<C>, z.TypeOf<E>>, z.ZodTypeDef, MachineConfigCRUD<z.TypeOf<C>, z.TypeOf<E>>>;
export declare const optionsSchema: z.ZodObject<{
    actions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>>;
}, "strip", z.ZodTypeAny, {
    actions?: Record<string, any> | undefined;
}, {
    actions?: Record<string, any> | undefined;
}>;
