export class AdminData
{
    public name: string;
    public UID: string;
    public email: string;
    public contactNumber: string

    constructor(name: string, UID: string, email: string, contactNumber: string)
    {
        this.name = name;
        this.UID = UID;
        this.email = email;
        this.contactNumber = contactNumber;
    }
}