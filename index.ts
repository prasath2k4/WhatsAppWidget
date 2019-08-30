import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class PCFWhatsApp implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _message: HTMLInputElement;
	private _anchor: HTMLAnchorElement;
	private _span : HTMLSpanElement;

	private _submitClicked: EventListenerOrEventListenerObject;
    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	public submitClick(evt: Event): void {
		var link = document.getElementById("link")
		
		//@ts-ignore
		var num = Xrm.Page.getAttribute('mobilephone').getValue()	
		//var num = "6596938493";

		var msg = this._message.value; 
		//@ts-ignore
		link.setAttribute('href', 'https://api.whatsapp.com/send?phone='.concat(num).concat('&text=').concat(msg));		

		//@ts-ignore
		window.open(link.href,'_blank');
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
		this._submitClicked = this.submitClick.bind(this);
		
		this._message = document.createElement("input");
        this._message.setAttribute("type", "text");
		this._message.setAttribute("id", "message");

		this._anchor = document.createElement("a");
		this._anchor.setAttribute("id", "link");
		this._anchor.setAttribute("href","#");
		this._anchor.setAttribute("class","float");
		this._anchor.setAttribute("target","_blank");
		this._anchor.addEventListener("click", this._submitClicked);

		this._span = document.createElement("span");
		this._span.setAttribute("class","fa fa-whatsapp my-float");

		this._container.appendChild(this._message);
		this._container.appendChild(this._anchor);
		this._anchor.appendChild(this._span);



	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}