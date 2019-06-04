// Need to create state [Global Variable]
let familyHistoryState = [];
// created state for mainuser information
let mainUser = {
    is_married : false
}

$(window).on('load',function(){
    // call events
    action('CREATE')

    $(document).on('click','.add-family',function(){
        action('CREATE')
    })

    $(document).on('click','.remove-family',function(){
        action('REMOVE',{
            index: $(this).parents('.row').attr('data-row-index')
        })
    })

    $(document).on('change','[name="is_adult"]',function(){
        action("UPDATE",{
            index: $(this).parents('.row').attr('data-row-index'),
            value : $(this).val(),
            key: `is_adult`
        })
    })
    // calling common function onchanges of select and input inside our target div 
    $(document).on('change','#familyMemberList input,#familyMemberList select',function(){
        action('UPDATE',{
            index : $(this).parents('.row').attr('data-row-index'),
            value: $(this).val(),
            key: $(this).attr('name')
        })
    })
    // on change event to set main user state
    $(document).on('change','[name="is_married"]',function(){
        if($(this).val() == 'true') {
            action("UPDATE_RELATION",$(this).val())
        } else {
            action("UPDATE_RELATION","")
        }
    })
})


// Render Function based on state

function renderFamilyMember () {
    let html = ``
    for (let i = 0; i < familyHistoryState.length; i++) {
        const e = familyHistoryState[i];
        html += `
        <div class="row mb-2" data-row-index="${i}">
            <div class="col">
                <input type="text" class="form-control" name="first_name" placeholder="First name" value="${e.first_name}">
            </div>
            <div class="col">
                <input type="text" class="form-control" name="last_name" placeholder="Last name" value="${e.last_name}">
            </div>
            <div class="col">
                <select class="form-control is-adult" name="is_adult">
                    <option value="">Is Adult</option>
                    <option value="true" ${e.is_adult == 'true' ? `selected` : ``}>Yes</option>
                </select>
            </div>`
            if(e.is_adult == 'true') {
                html += `<div class="col">
                    <input type="text" class="form-control" name="mobile" placeholder="Mobile" value="${e.mobile}" autocomplete="off">
                </div>`
            }
            
            html += `<div class="col">
                <select class="form-control" name="relation">
                    <option>Relation</option>
                    <option value="brother" ${e.relation == 'brother' ? `selected` : ``}>Brother</option>
                    <option value="sister" ${e.relation == 'sister' ? `selected` : ``}>Sister</option>
                    <option value="mother" ${e.relation == 'mother' ? `selected` : ``}>Mother</option>
                    ${
                        mainUser.is_married == "true" ? 
                        `<option value="spouse" ${e.relation == 'spouse' ? `selected` : ``}>Spouse</option>` : 
                        ``
                    }
                </select>
            </div>
            <div class="col col-auto">`
            if(i+1 == familyHistoryState.length && i<=1) {
                html += `<button type="button" class="btn btn-success add-family">
                <i class="fa fa-plus"></i>
            </button>`
            } else {
                html += `<button type="button" class="btn btn-danger remove-family">
                <i class="fa fa-trash"></i>
            </button>`
            }
                
                
            html += `</div>
        </div>
        `
    }
    $('#familyMemberList').html(html)
}

// Action function to modify our state

function action(type,payload) {
    switch (type) {
        case "CREATE":
            familyHistoryState.push({
                first_name: ``,
                last_name: ``,
                is_adult: `false`,
                mobile:``,
                relation: ``,
                is_married : false
            })
            
            break;
        case "UPDATE":
            familyHistoryState[payload.index][payload.key] = payload.value;
            break;
        // added new case for update main user relation state
        case "UPDATE_RELATION":
            mainUser.is_married = payload
            break;
        case "REMOVE":
            familyHistoryState.splice(payload.index,1);
            break;
        default:
            break;
    }
    renderFamilyMember();
}
