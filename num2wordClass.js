/*
 *
 * Number to french converter
 * 
 * */

class num2word{
    units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    teens= ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

    // translated words
    exWords=[];

    /*
    * Convert input number to french words
    * valid numbers => 0-999999
    * */
    convert(xNumber){
        // clear the cache
        this.exWords=[];

        // validate number
        if(isNaN(xNumber)) return "Input is not a number.";
        if(xNumber>999999) return "Number is out of range.";
        if(xNumber<0) return "Negative numbers are not supported.";

        // convert number to string
        var strNumber= xNumber.toString();

        // exception for zero
        if(strNumber==0) return "zéro";

        // group by 3 digits from right side
        var numGroups=[];
        for (var i = 0, charsLength = strNumber.length; i < charsLength; i += 3) {
            numGroups.push(strNumber.substring(strNumber.length-i-3, strNumber.length-i));
        }

        //console.log(numGroups);

        // translate each group
        for(var i=numGroups.length-1;i>=0;i--){
            // divide the numbers into 3 digits
            var xUnits=     Math.floor(numGroups[i]%10);
            var xTens=      Math.floor(numGroups[i]/10%10);
            var xHundreds=  Math.floor(numGroups[i]/100%10);
            //console.log(xHundreds+"-"+xTens+"-"+xUnits);

            if(xHundreds>0){
                // we do not say one-hundred so add exception for one
                if(xHundreds==1){
                    this.exWords.push("cent");
                }else{
                    // if end with 00 like 200 use plural
                    this.exWords.push(this.units[xHundreds], "cent"+((xUnits==0 && xTens==0)?"s":""));
                }
            }

            // nothing to do with numbers ending with double zeros like 100, 200
            if(xTens!=0 || xUnits!=0){

                switch (xTens) {
                    // like 206,207
                    case 0:
                        this.exWords.push(this.units[xUnits]);
                        break;
                    // like 216, 217
                    case 1:
                        this.exWords.push(this.teens[xUnits]);
                        break;
                    // like 271, 272
                    case 7:
                        this.exWords.push(this.tens[xTens]+((xUnits==1)?"-et-":"-")+this.teens[xUnits]);
                        break;
                    // like 280, 281, 282
                    case 8:
                        // use plural for 280
                        if(xUnits==0){
                            this.exWords.push(this.tens[xTens]+"s");
                        }else{
                            this.exWords.push(this.tens[xTens]+"-"+this.units[xUnits]);
                        }
                        break;
                    // like 291, 292
                    case 9:
                        this.exWords.push(this.tens[xTens]+"-"+this.teens[xUnits]);
                        break;

                    default:
                        if(xUnits==0){
                            this.exWords.push(this.tens[xTens]);
                        }else{
                            this.exWords.push(this.tens[xTens]+((xUnits==1)?"-et-":"-")+this.units[xUnits]);
                        }
                        break;
                }
            }
            /*
             * Check for thousands
             */
            // if the number is greater than 999 means there is more than one group
            if(i>0){
                this.exWords.push("mille"+(i>1?"s":""));// i>1 means its plural
            }
        }
        return this.exWords.join(" ");
    };
}



// create test case and compare
/* Please add jquery library in case of using the test function for Ajax call
function test(num) {
    zx= new num2word();
    $.ajax({
        url: "https://clevert.com.br/t/en/numbers_to_words/generate?number="+num+"&numLanguage=fr",
    }).done(function (data) {
        if(data.toLowerCase()==zx.convert(num)){
            console.log(num+" passed.");
        }else{
            console.log(num+" FAILED. =>"+(data.toLowerCase()+"=="+zx.convert(num)));
        };
    });
}
*/
