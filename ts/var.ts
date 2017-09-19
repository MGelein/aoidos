/**
 * The variable register of aoidos
 */
class Var{
    /**A list of V instances */
    public vars:V[] = [new V()];

    /**
     * Tries to find the variable with the provided name and
     * returns the value of it. If it is not set, returns 0;
     * @param name the name of the variable
     */
    get(name:string):number{
        let v:V = this.find(name);
        if(v == undefined) return 0;
        else return v.qty;
    }

    /**
     * Sets the variable with the provided name to the provided
     * quantity.
     * @param name the name of the variable to set
     * @param qty the quantity to set it to
     */
    set(name:string, qty:number){
        let v:V = this.find(name);
        if(v != undefined) v.qty = qty;
        //If it didnt exist yet, create it
        else this.vars.push(new V(name, qty));
    }

    /**
     * Adds the provided amount to the variable with the
     * provided name
     * @param name the name of the variable to add to
     * @param qty the quantity to add to the variable
     */
    add(name:string, qty:number){
        this.set(name, this.get(name) + qty);
    }

    /**
     * 
     * @param name the name of the variable to subtract from
     * @param qty the quantity to subtract from the variable
     */
    subtract(name:string, qty:number){
        this.set(name, this.get(name) - qty);
    }

    /**
     * Tests if the variable with the provided name is equal
     * to the provided quantity
     * @param name The name of the variable to test
     * @param qty the quantity to be equal to
     */
    equals(name:string, qty:number):boolean{
        return this.get(name) == qty;
    }

    /**
     * Tests if the variable with the provided name
     * is smaller than the provided quantity
     * @param name the variable to test
     * @param qty the quantity to test to be smaller than
     */
    smallerThan(name: string, qty:number):boolean{
        return this.get(name) < qty;
    }

    
    /**
     * Tests if the variable with the provided name
     * is greater than the provided quantity
     * @param name the variable to test
     * @param qty the quantity to test to be greater than
     */
    greaterThan(name: string, qty:number):boolean{
        return this.get(name) > qty;
    }

    /**
     * Returns the V with the provided name
     * @param name the name of the V to find
     */
    private find(name:string):V{
        var max = this.vars.length;
        for(var i = 0; i < max; i++){
            if(this.vars[i].name == name) return this.vars[i];
        }
        return undefined;
    }
}
/**
 * This class holds the combination of a variable name and a quantity
 * number attached to it.
 */
class V{
    public name:string = '';
    public qty:number = 0;
    /**
     * Create a new V with the provided variables
     * @param name the name to give this V
     * @param qty the quantity of this v
     */
    constructor(name:string = 'none', qty:number = 0){
        this.name = name;
        this.qty = qty;
    }
}