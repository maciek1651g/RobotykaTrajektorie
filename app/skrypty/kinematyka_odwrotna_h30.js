function kinematyka_odwrotna_h30(p_1)
{
    var wynik = []
    var p_x = p_1[0]
    var p_y = p_1[1]
    var p_z = p_1[2]
    for(var kom1=1;kom1<=2;kom1++)
	{
        for(var kom3=1;kom3<=2;kom3++)
		{
            var t_1 = 0.0
            if (kom1 == 1)
                t_1 = Math.atan2(p_y, p_x)
            else
                t_1 = Math.atan2(-p_y, -p_x)

            var CCC = ((p_x * p_x) + (p_y * p_y) + 16 * 16 - 32 * (Math.cos(t_1) * p_x + Math.sin(t_1) * p_y) + ((p_z - 350) *(p_z - 350)) - 2 * (220 * 220)) / (2 * 220 * 220)

            var t_3 = 0.0
            if (Math.abs(CCC) > 1)
                continue
            else
                if (kom3 == 1)
                    t_3 = Math.atan2(Math.sqrt(1 - (CCC * CCC)), CCC)
                else
                    t_3 = Math.atan2(-Math.sqrt(1 - (CCC * CCC)), CCC)

            var t_2 = Math.atan2((220 * Math.cos(t_3) + 220) * (p_z - 350) - (220 * Math.sin(t_3)) * (Math.cos(t_1) * p_x + Math.sin(t_1) * p_y - 16),(220 * Math.cos(t_3) + 220) * (Math.cos(t_1) * p_x + Math.sin(t_1) * p_y - 16) + (220 * Math.sin(t_3)) * (p_z - 350))

            t_1 = radiany_na_stopnie(t_1)
            t_2 = radiany_na_stopnie(t_2)
            t_3 = radiany_na_stopnie(t_3)

            wynik.push([t_1,t_2,t_3])
		}
	}

    return wynik
}