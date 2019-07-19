getValues = () => {
    let supLim = parseFloat(document.getElementById('sup_lim').value)
    supLim >= 0 ? {} : alert('Ingresa un valor numérico en el límite superior') 
    let infLim = parseFloat(document.getElementById('inf_lim').value)
    infLim >= 0 ? {} : alert('Ingresa un valor numérico en el límite inferior')
    if (supLim == infLim) {
        alert('¡Los valores del límite superior e inferior son iguales!')
        throw new Error ('Los valores del límite superior e inferior son iguales')
    }
    let objective = parseFloat(document.getElementById('objective').value)
    if (objective >= 0 ) {
        if (objective >= infLim && objective <= supLim) {

        } else {
            alert('El valor del objetivo no está dentro del rango de los límites')
            throw new Error ('El valor del objetivo no está dentro del rango de los límites')
        }
    } else {
        alert('Ingresa un valor numérico en el objetivo')
    }
    
    let error = parseFloat(document.getElementById('error').value)
    error >= 0 ? {} : alert('Ingresa un valor numérico en el margen de error') 
    supLim > infLim ? values = {supLim, infLim, objective, error} :
        infLim > supLim ? values = {supLim: infLim, infLim: supLim, objective, error } : {}
        
    return values
}

getAverage = (supLim, infLim) => {
    return ((supLim + infLim) / 2)
}

getTableColumns = (iterations) => {
    table = document.querySelector('#table')
    iterations.forEach(iteration => {
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let tr = document.createElement('tr')
        td1.innerHTML = iteration.counter
        td2.innerHTML = iteration.supLim
        td3.innerHTML = iteration.infLim
        td4.innerHTML = `(${iteration.supLim}+${iteration.infLim})/2=${iteration.average}`
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        table.appendChild(tr)
    })
}

getNewValues = (values, counter, iterations) => {
    counter += 1
    let newIterations = iterations
    let average = this.getAverage(values.supLim, values.infLim)
    if(average <= (values.objective + values.error) && average >= (values.objective - values.error)) {
        let iteration = {
            supLim: values.supLim,
            infLim: values.infLim,
            average: average,
            counter: counter
        }
        newIterations.push(iteration)
        this.getTableColumns(newIterations)
    } else {
        if(average > values.objective) {
            let newValues = {
                supLim: average,
                infLim: values.infLim,
                objective: values.objective,
                error: values.error
            }
            let iteration = {
                supLim: values.supLim,
                infLim: values.infLim,
                average: average,
                counter: counter
            }
            newIterations.push(iteration)
            getNewValues(newValues, counter, newIterations)
        } else {
            let newValues = {
                supLim: values.supLim,
                infLim: average,
                objective: values.objective,
                error: values.error
            }
            let iteration = {
                supLim: values.supLim,
                infLim: values.infLim,
                average: average,
                counter: counter
            }
            newIterations.push(iteration)
            getNewValues(newValues, counter, newIterations)
        }
    }
}

clearTable = () => {
    let table = document.querySelector('#table')
    while (table.childNodes.length > 2) { 
        table.removeChild(table.lastChild);
    }
}

getMasterFunction = () => {
    this.clearTable()
    let iterations = []
    let counter = 0
    let values = this.getValues()
    this.getNewValues(values, counter, iterations)
}

document.getElementById("button").addEventListener("click", getMasterFunction);
