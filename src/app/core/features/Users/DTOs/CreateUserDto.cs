using System;

namespace KaappaanPlus.Application.Features.Users.DTOs
{
    public class CreateUserDto
    {
        public Guid TenantId { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string Role { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
import { CanComponentDeactivate } from '../../../guards/unsaved-changes-guard';