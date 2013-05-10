using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
namespace ZZTJTract
{
    public class Class1 : DataTract.ITract
    {
        #region ITract Members
        /*
         资料的时间资料需要有对应的格式
         * [y:1902m:3d:0]
         */
        /// <summary>
        /// tract time, split content to sections by time
        /// </summary>
        /// <param name="timeRegExp">groups year,month,day</param>
        /// <param name="timeDisplayRegex"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        /// 
        List<History.HEvent> events = new List<History.HEvent>();

        public List<History.HEvent> Tract(string timeRegexp, string content,string country)
        {

          
            Regex regTimeIndex = new Regex(timeRegexp);

            MatchCollection matchs = regTimeIndex.Matches(content);

            for (int i = 0; i < matchs.Count; i++)
            {
                Match m = matchs[i];
                History.HEvent he = new History.HEvent();
                //get timeIndex
                Match indexM = regTimeIndex.Match(m.Value);
                int year,yearad,yearbc, month, date;
                
                int.TryParse(m.Groups["yearad"].Value, out yearad);
                int.TryParse(m.Groups["yearbc"].Value, out yearbc);
                int.TryParse(m.Groups["month"].Value, out month);
                int.TryParse(m.Groups["date"].Value, out date);
                if (string.IsNullOrEmpty(country))
                {
                    country = m.Groups["country"].Value;
                }
                he.Year = yearad>0?yearad:yearbc>0?-yearbc:0;
                he.Month = month;
                he.Date = date;
                he.Country = country;
                //get the content
               
                int startIndex = content.IndexOf(m.Value);
                int endIndex = 0;
                if (i == matchs.Count - 1) { endIndex = content.Length; }
                else
                {
                    endIndex = content.IndexOf(matchs[i + 1].Value);
                  //  Int64 a = content.IndexOf(matchs[i + 1].Value);
                    if (endIndex > int.MaxValue)
                    { 
                     Tract(timeRegexp,content.Substring(startIndex),country);
                    }
                }

                he.Content = content.Substring(startIndex, endIndex - startIndex);
                events.Add(he);
            }
            return events;
        }

        #endregion
    }
}
