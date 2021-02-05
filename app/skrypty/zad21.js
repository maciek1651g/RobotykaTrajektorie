function wyswietl_zad21()
{
	var wynik = oblicz_zad21()
	//[t_b,a,u_1,V,k, t_1,p_0, precyzja]
	
	
	if(wynik!=null)
	{
		// for(var i=0;i<wynik.length-1;i++)
		// {
			// wynik[i] = round(wynik[i],wynik[wynik.length-1])
		// }
		
		var tabela = "<table><tbody><th>Równania\\Współczynniki</th><th>a</th><th>b</th><th>c</th>"
		
		var wspolczynniki = []
		
		wspolczynniki.push([])
		wspolczynniki[0].push(0.5*wynik[1])
		wspolczynniki[0].push(0)
		wspolczynniki[0].push(0)
		
		wspolczynniki.push([])
		wspolczynniki[1].push(0)
		wspolczynniki[1].push(wynik[3])
		wspolczynniki[1].push((wynik[2]-(wynik[3]*wynik[5]))/2.0)
		
		wspolczynniki.push([])
		wspolczynniki[2].push(-0.5*wynik[1])
		wspolczynniki[2].push(wynik[1]*wynik[5])
		wspolczynniki[2].push(wynik[2]-(0.5*wynik[1]*wynik[5]*wynik[5]))
		
		
		for(var i=0;i<3;i++)
		{
			tabela+="<tr>"
			
			switch(i)
			{
				case 0:
					tabela+="<td>Początkowe</td>"
					break
				case 1:
					tabela+="<td>Centralne</td>"
					break
				case 2:
					tabela+="<td>Końcowe</td>"
					break
			}
			
			for(var j=0;j<3;j++)
			{
				tabela = tabela + ("<td>" + round(wspolczynniki[i][j],wynik[wynik.length-1]) +  "</td>")
			}
			tabela+="</tr>"
		}
		
		tabela += "</tbody></table><p style='margin-Left:15px;'>t<sub>b</sub>="+round(wynik[0],wynik[wynik.length-1])+"</p>"
		
		document.getElementById("wynik21tabela").innerHTML = tabela
	}
}


function oblicz_zad21()
{
	var p_0 = [parseFloat(document.getElementById("pp2x").value),
			parseFloat(document.getElementById("pp2y").value),
			parseFloat(document.getElementById("pp2z").value)]
	
	for(var i=0;i<p_0.length;i++)
	{
		if(isNaN(p_0[i]))
		{
			//console.error("Błędne dane.")
			document.getElementById("wynik21tabela").innerHTML = "<p>Musisz podać położenie początkowe.</p>"
			return null
		}
	}
	
	
	var p_1 = [parseFloat(document.getElementById("pk2x").value),
			parseFloat(document.getElementById("pk2y").value),
			parseFloat(document.getElementById("pk2z").value)]
	
	for(var i=0;i<p_1.length;i++)
	{
		if(isNaN(p_1[i]))
		{
			//console.error("Błędne dane.")
			document.getElementById("wynik21tabela").innerHTML = "<p>Musisz podać położenie końcowe.</p>"
			return null
		}
	}
	
	var tmp = kinematyka_odwrotna_h30(p_1)
	
	if(tmp.length==0)
	{
		document.getElementById("wynik21tabela").innerHTML = "<p>Brak rozwiązań.</p>"
		return null
	}
	
	
	var V=parseFloat(document.getElementById("V21").value);
	
	if(isNaN(V) || V<=0)
	{
		document.getElementById("wynik21tabela").innerHTML = "<p>Prędkość musi być dodatnia.</p>"
		return null
	}
	
	p_0 = kinematyka_prosta_h30(p_0[0],p_0[1],p_0[2])
	
	var k = []
	var mnoznik=0
	
	for(var i=0;i<p_0.length;i++)
		mnoznik+=(p_1[i]-p_0[i])*(p_1[i]-p_0[i])
	mnoznik = Math.sqrt(mnoznik)
	u_0 = 0
	u_1 = mnoznik
	mnoznik = 1/mnoznik

	for(var i=0;i<p_0.length;i++)
		k.push((p_1[i]-p_0[i])*mnoznik)
	
	var precyzja = parseInt(document.getElementById("p21").value)
	
	if(isNaN(precyzja) || precyzja<0)
	{
		precyzja=2
		document.getElementById("p21").value = 2
	}
	
	
	document.getElementById("czas_t21").innerHTML = round((u_1)/V,precyzja) + '< t<sub>1</sub> <=' + round((2*u_1)/V,precyzja)
	
	var t_0=0
	var t_1=parseFloat(document.getElementById("t21").value);
	
	if(isNaN(t_1) || t_1<=0)
	{
		document.getElementById("wynik21tabela").innerHTML = "<p>Czas musi być dodatni.</p>"
		return null
	}
	
	
	if(t_1<=((u_1)/V) || t_1>((2*u_1)/V))
	{
		document.getElementById("wynik21tabela").innerHTML = "<p>Brak rozwiązań.</p>"
		return null
	}
	
	
	var t_b = (-u_1+V*t_1)/V
	var a = V/t_b
	
	
	////////////////////////////////////////////
	
	
	return [t_b,a,u_1,V,k, t_1,p_0, precyzja]
}

