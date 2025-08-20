"use client";

import { withRoleGuard } from "@/components/auth/AccessControl";
import ContainersPage from "@/components/pages/nvocc/ContainersPage";

export default withRoleGuard(ContainersPage, ["nvocc"]);
