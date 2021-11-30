import * as z from 'zod';
import { MachineConfigCRUD } from '..';
export declare const configSchema: z.ZodType<MachineConfigCRUD<any, any>, z.ZodTypeDef, MachineConfigCRUD<any, any>>;
export declare const optionsSchema: z.ZodObject<{
    actions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>>;
}, "passthrough", z.ZodTypeAny, {
    actions?: Record<string, any> | undefined;
}, {
    actions?: Record<string, any> | undefined;
}>;
