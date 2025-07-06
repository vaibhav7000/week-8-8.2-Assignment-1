import * as z from "zod";

export function signUpValidator(user) {
    const validator = z.object({
        username: z.string().trim().toLowerCase().email(),
        firstName: z.string().trim().min(3).max(50),
        lastName: z.string().trim().min(3).max(50),
        password: z.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    })

    const result = validator.safeParse(user);

    return result;
}