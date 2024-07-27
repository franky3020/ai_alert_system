import { Position } from "./Position";

export class UserAlertMsg {

    alertTime: Date;
    position: Position;
    issueEmergencyAlertUserId: string;
    alertContent: string

    constructor(alertTime: Date, position: Position, issueEmergencyAlertUserId: string, alertContent: string){
        this.alertTime = alertTime;
        this.position = position;
        this.issueEmergencyAlertUserId = issueEmergencyAlertUserId;
        this.alertContent = alertContent;
    }

    toJson(): string
    {
        return JSON.stringify(this);
    }
}
