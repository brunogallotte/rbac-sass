import { defineAbilityFor, userSchema } from "@sass/auth";
import { Role } from "@sass/auth/src/roles";

export function getUserPermissions(userId: string, role: Role) {
    const authUser = userSchema.parse({
        id: userId,
        role: role
    })

    const ability = defineAbilityFor(authUser)

    return ability
}