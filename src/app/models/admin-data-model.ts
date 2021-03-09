export class AdminData
{
    public name: string;
    public UID: string;
    public email: string;
    public contactNumber: string;
    public role: string;

    constructor(name: string, UID: string, email: string, contactNumber: string, role: string)
    {
        this.name = name;
        this.UID = UID;
        this.email = email;
        this.contactNumber = contactNumber;
        this.role = role;
    }
}