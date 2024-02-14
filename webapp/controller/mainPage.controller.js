sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "../model/formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"


], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, ResourceModel,formatter,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("fioriwalk.controller.mainPage", {
            formatter: formatter,
            onInit: function () {
                // set data model on view
                const oData = {
                    recipient: {
                        name: "Zishan"
                    }
                };
                const oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                // set i18n model on view
                const i18nModel = new ResourceModel({
                    bundleName: "fioriwalk.i18n.i18n"
                });
                this.getView().setModel(i18nModel, "i18n");


                const oViewModel = new JSONModel({
                    currency: "EUR"
                });
                this.getView().setModel(oViewModel, "view");
            
            },
            onPress(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Detail", {
                    invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))});
            },


            onShowHello() {
                  // read msg from i18n model
         const oBundle = this.getView().getModel("i18n").getResourceBundle();
         const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         const sMsg = oBundle.getText("helloMsg", [sRecipient]);

         // show message
         MessageToast.show(sMsg);
            },

            onOpenDialog() {
                // create dialog lazily
                this.pDialog ??= this.loadFragment({
                    name: "fioriwalk.fragments.fragDialog"
                });
            
                this.pDialog.then((oDialog) => oDialog.open());
            },
           
            onCloseDialog() {
                // note: We don't need to chain to the pDialog promise, since this event handler
                // is only called from within the loaded dialog itself.
                this.byId("helloDialog").close();
            },

            onFilterInvoices(oEvent) {
                // build filter array
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }
    
                // filter binding
                const oList = this.byId("invoiceList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }

        });
    });
