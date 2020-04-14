declare namespace OrganizationValidator {
  // Add Organization
  interface AddOrganization {
    authorization?: string;
    name?: string;
    description?: string;
    image?: string;
  }
}

export = OrganizationValidator;
