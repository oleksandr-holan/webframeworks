import { Modal as BootstrapModal } from "bootstrap";

export class AlertModal {
  protected modalElement: HTMLElement;
  protected titleElement: HTMLElement;
  protected messageElement: HTMLElement;
  protected btnPrimaryElement: HTMLButtonElement;
  protected modalInstance: BootstrapModal;

  constructor(
    modalId: string,
    titleElementSelector: string,
    messageElementSelector: string,
    btnPrimaryElementSelector: string,
  ) {
    this.modalElement = document.getElementById(modalId)!;
    this.titleElement = this.querySelector(titleElementSelector)!;
    this.messageElement = this.querySelector(messageElementSelector)!;
    this.btnPrimaryElement = this.querySelector(
      btnPrimaryElementSelector,
    )! as HTMLButtonElement;
    this.modalInstance = new BootstrapModal(this.modalElement);
  }

  show(message: string): void {
    this.setContent(message);
    this.modalInstance.show();
  }

  hide(): void {
    this.modalInstance.hide();
  }

  private setContent(message: string): void {
    this.messageElement.textContent = message;
  }

  querySelector(selectors: string): HTMLElement | null {
    return this.modalElement.querySelector(selectors);
  }
}

export class PromptModal extends AlertModal {
  private inputElement: HTMLInputElement;
  private btnSecondaryElement: HTMLButtonElement;

  constructor(
    modalId: string,
    titleElementSelector: string,
    messageElementSelector: string,
    inputElementSelector: string,
    btnPrimaryElementSelector: string,
    btnSecondaryElementSelector: string,
  ) {
    super(
      modalId,
      messageElementSelector,
      titleElementSelector,
      btnPrimaryElementSelector,
    );
    this.inputElement = this.querySelector(
      inputElementSelector,
    )! as HTMLInputElement;
    this.btnSecondaryElement = this.querySelector(
      btnSecondaryElementSelector,
    )! as HTMLButtonElement;
  }

  addBtnPrimaryEventListener(
    btnPrimaryListener: (this: HTMLButtonElement, ev: MouseEvent) => any,
  ): this {
    this.btnPrimaryElement.addEventListener("click", btnPrimaryListener);
    return this;
  }

  setBtnPrimaryDataAttribute(data: string, name: string): this {
    this.btnPrimaryElement.setAttribute(name, data);
    return this;
  }

  getBtnPrimaryDataAttribute(name: string): string | null {
    return this.btnPrimaryElement.getAttribute(name);
  }

  show(message: string): Promise<string> {
    this.clearInput();
    super.show(message);

    return new Promise((resolve) => {
      const confirmHandler = () => {
        const inputValue = this.getInputValue();
        this.hide();
        resolve(inputValue);
      };

      this.addBtnPrimaryEventListener(confirmHandler);
    });
  }

  clearInput(): this {
    if (this.inputElement) {
      this.inputElement.value = "";
    }
    return this;
  }

  getInputValue(): string {
    return this.inputElement.value;
  }
}
