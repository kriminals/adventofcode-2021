let polymerTemplate = 'SVCHKVFKCSHVFNBKKPOC'
let pairInput = `NC -> H
PK -> V
SO -> C
PH -> F
FP -> N
PN -> B
NP -> V
NK -> S
FV -> P
SB -> S
VN -> F
SC -> H
OB -> F
ON -> O
HN -> V
HC -> F
SN -> K
CB -> H
OP -> K
HP -> H
KS -> S
BC -> S
VB -> V
FC -> B
BH -> C
HH -> O
KH -> S
VF -> F
PF -> P
VV -> F
PP -> V
BO -> H
BF -> B
PS -> K
FO -> O
KF -> O
FN -> H
CK -> B
VP -> V
HK -> F
OV -> P
CS -> V
FF -> P
OH -> N
VS -> H
VO -> O
CP -> O
KC -> V
KV -> P
BK -> B
VK -> S
NF -> V
OO -> V
FH -> H
CN -> O
SP -> B
KN -> V
OF -> H
NV -> H
FK -> B
PV -> N
NB -> B
KK -> P
VH -> P
CC -> B
HV -> V
OC -> H
PO -> V
NO -> O
BP -> C
NH -> H
BN -> O
BV -> S
CV -> B
HS -> O
NN -> S
NS -> P
KB -> F
CO -> H
HO -> P
PB -> B
BS -> P
SH -> H
FS -> V
SF -> O
OK -> F
KP -> S
BB -> C
PC -> B
OS -> C
SV -> N
SK -> K
KO -> C
SS -> V
CF -> C
HB -> K
VC -> B
CH -> P
HF -> K
FB -> V`
const pairInsertion = new Map(pairInput.split('\n').map(pair => pair.split(' -> ')))
const polymerInsertion = (polymerTemplate) => {
    return polymerTemplate.split('').flatMap((element,i,array) => {
            const pair = element + array[i + 1]
        if (pairInsertion.has(pair)) {
            return [element, pairInsertion.get(pair)]
         }
         return element
    }).join('')
}
const polymerSteps = (template, steps) => steps === 0 ? template : polymerSteps(polymerInsertion(template), --steps) 
const polymerAfter10Steps = polymerSteps(polymerTemplate, 10)
const polymerSet = new Set(polymerAfter10Steps.split(''))
const polymerMap = new Map()
polymerSet.forEach(element => polymerMap.set(element, 0))
polymerAfter10Steps.split('').forEach(element => polymerMap.set(element, polymerMap.get(element) + 1))
console.log(polymerMap)
console.log(Math.max(...polymerMap.values()) - Math.min(...polymerMap.values()))