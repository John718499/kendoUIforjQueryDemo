$(document).ready(function () {
    let wizard;
    let model;
    let validator;

    wizard = $("#wizard").kendoWizard({
        actionBar: false,
        steps: [{
            title: "基本資料",
            content: $("#step1")
        }, {
            title: "其他資料",
            content: $("#step2")
        }]
    }).data('kendoWizard');

    model = kendo.observable({
        name: "",
        phone: "",
        email: "",
        sex: "man",
        area: "",
        address: "",
    })
    kendo.bind($("#wizard"), model)

    validator = $("#step1").kendoValidator({
        messages: {
            required: "必填",
            email: "請輸入正確Email"
        },
    }).data("kendoValidator")

    $("#area").kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: "./area.json",
                }
            }
        },
        dataTextField: "CityName",
        dataValueField: "CityEngName",
        optionLabel: "請選擇",
    });

    $(".k-button.next").on('click', () => {
        if (validator.validate()) wizard.next();
    })

    $(".k-button.previous").on('click', () => {
        wizard.previous();
    })

    $("#send").on('click', () => {
        let confirmResult=confirm("確認送出資料?")
        if(confirmResult)console.log(model.toJSON())
    })
})