import { NgModule } from '@angular/core';
import { ScoringTabComponent } from './scoring-tab/scoring-tab';
import { VerificationTabComponent } from './verification-tab/verification-tab';
import { OnboardingTabComponent } from './onboarding-tab/onboarding-tab';
@NgModule({
	declarations: [ScoringTabComponent,
    VerificationTabComponent,
    OnboardingTabComponent],
	imports: [],
	exports: [ScoringTabComponent,
    VerificationTabComponent,
    OnboardingTabComponent]
})
export class ComponentsModule {}
