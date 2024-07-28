export class RiskAssessmentReport {
    level:                     string;
    distanceRadiusOfInfluence: string;
    basisOfJudgment:           string;

    constructor(level: string, distanceRadiusOfInfluence: string, basisOfJudgment: string) {
        this.level = level;
        this.distanceRadiusOfInfluence = distanceRadiusOfInfluence;
        this.basisOfJudgment = basisOfJudgment;
    }

    toJson(): string {
        return JSON.stringify(this);
    }

    show() {
        console.log("level: ", this.level);
        console.log("distanceRadiusOfInfluence: ", this.distanceRadiusOfInfluence);
        console.log("basisOfJudgment: ", this.basisOfJudgment);
    }
}
