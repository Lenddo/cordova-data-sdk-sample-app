import { NgModule } from '@angular/core';
import { ScoringTabComponent } from './scoring-tab/scoring-tab';
import { VerificationTabComponent } from './verification-tab/verification-tab';
@NgModule({
	declarations: [ScoringTabComponent,
    VerificationTabComponent],
	imports: [],
	exports: [ScoringTabComponent,
    VerificationTabComponent]
})
export class ComponentsModule {}
