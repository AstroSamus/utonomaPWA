const $buttonDialogNextWelcomeUtonoma = document.querySelector<HTMLButtonElement>('#buttonDialogNextWelcomeUtonoma');
const $buttonDialogBackWelcomeUtonoma = document.querySelector<HTMLButtonElement>('#buttonDialogBackWelcomeUtonoma');
const $buttonDialogCloseWelcomeUtonoma = document.querySelector<HTMLButtonElement>('#buttonDialogCloseWelcomeUtonoma');
const $dialogWelcomeUtonomaParagraphCreate = document.querySelector<HTMLParagraphElement>('#dialogWelcomeUtonomaParagraphCreate');
const $dialogWelcomeUtonomaParagraphVote = document.querySelector<HTMLParagraphElement>('#dialogWelcomeUtonomaParagraphVote');
const $dialogWelcomeUtonomaParagraphHold = document.querySelector<HTMLParagraphElement>('#dialogWelcomeUtonomaParagraphHold');

/***
 * 1. Declarar mis steps disponibles
 * 2. Declarar mi currentStep
 * 3. Al hacer click en back o next, cambiar el currentStep
 * 4. Como side effect, despues de haber cambiado el currentState
 *   ocultar todos los parrafos y mostrar solo el del currentStep
 */
enum Step {
  Create, // 0
  Vote, // 1
  Hold // 2
}

class WelcomeTutorial {
  #currentStep: Step = Step.Create;

  // Getter
  get currentStep(): Step {
    return this.#currentStep;
  }

  // Setter (controlado)
  set currentStep(step: Step) {
    this.#currentStep = step;
    this.onStepChange(step);
  }


  // Avanza al siguiente step
  nextStep(): void {
    if (this.#currentStep < Step.Hold) {
    this.currentStep = this.#currentStep + 1;
    }
  }


  // Retrocede
  prevStep(): void {
    if (this.#currentStep > Step.Create) {
    this.currentStep = this.#currentStep - 1;
    }
  }


  // Hook interno (render, side effects, etc.)
  private onStepChange(step: Step): void {
    console.log('Current step:', Step[step]); // Create | Vote | Hold
    switch (step) {
      case Step.Create:
        $dialogWelcomeUtonomaParagraphCreate!.style.display = 'block';
        $dialogWelcomeUtonomaParagraphVote!.style.display = 'none';
        $dialogWelcomeUtonomaParagraphHold!.style.display = 'none';
        break;
      case Step.Vote:
        $dialogWelcomeUtonomaParagraphCreate!.style.display = 'none';
        $dialogWelcomeUtonomaParagraphVote!.style.display = 'block';
        $dialogWelcomeUtonomaParagraphHold!.style.display = 'none';
        break;
      case Step.Hold:
        $dialogWelcomeUtonomaParagraphCreate!.style.display = 'none';
        $dialogWelcomeUtonomaParagraphVote!.style.display = 'none';
        $dialogWelcomeUtonomaParagraphHold!.style.display = 'block';
        break;
  
    }
  }
}

const welcomeTutorial = new WelcomeTutorial()

welcomeTutorial.currentStep = Step.Create; // Inicializo el tutorial en el primer paso

$buttonDialogBackWelcomeUtonoma?.addEventListener('click', () => {
  welcomeTutorial.prevStep();
});

$buttonDialogNextWelcomeUtonoma?.addEventListener('click', () => {
  welcomeTutorial.nextStep();
});