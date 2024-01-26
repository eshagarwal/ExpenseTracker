---> ADD_TR (userName, Amount)
    if 
        userName found 
        add ammount
    return success/true

    else 
    return failure/false


---> SPEND_TR (userName, Amount, purpose)
    if 
        userName found 
        add the amount spent, purpose for that
    return success/true

    else 
    return failure/false


---> VIEW_TR (userName)
    if 
        userName found 
        send the object of that user
    return success/true

    else 
    return failure/false


---> CURRENT_BAL (userName)
    if 
        userName found 
        do the calculations
    return success/true

    else 
    return failure/false

