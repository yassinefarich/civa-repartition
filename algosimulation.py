#import math
from random import shuffle
import pandas as pd



def vectGenerator (dictionnary, size = 100):
    listefinale = []
    modAndFrequencies = list(dictionnary.items())
    modAndFrequenciesLess = modAndFrequencies[:-1]
    nombreModalite = len(modAndFrequenciesLess)
    for mod in range(0, nombreModalite):
        modality = modAndFrequencies[mod][0]
        percentage = modAndFrequencies[mod][1]
        #if round(percentage*size) == 0 :
            #numberOfModality =  math.floor(percentage*size)
        #else:
        numberOfModality = round(percentage*size)
        listefinale.extend([modality]*numberOfModality)
    listefinale.extend([modAndFrequencies[nombreModalite][0]]*(size - len(listefinale)))
    shuffle(listefinale)
    return listefinale





#Colonnes : 
#Theme
Sexe = ({ "Femme":3/10 ,"Homme":6/10, "pasDeSexe" : 1/10 }, 100)



#creation de la table excel : 
Table = pd.DataFrame()
Table['Sexe'] = vectGenerator(Sexe)
Table['À quelle est votre degré de sensibilité  de la politique vaccinale ?'] = vectGenerator({ "Femme":3/10 ,"Homme":6/10 }, 10)




with pd.ExcelWriter('fichier_lisible.xlsx') as writer:  
    df_data_0.to_excel(writer, sheet_name='Sondages')
 



