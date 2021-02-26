export class UserData
{
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public suffix?: string;
    public address: string;
    public barangay: string;
    public city: string;
    public region: string;
    public postalCode: string;
    public email: string;

    constructor(firstName: string, middleName: string, lastName: string, address: string, barangay: string, city: string, region: string, postalCode: string,  email: string, suffix?: string )
    {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address = address;
        this.barangay = barangay;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.email = email;
        this.suffix = suffix;
    }
}