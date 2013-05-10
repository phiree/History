using System;

using System.Linq;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace History
{
    public class Bll
    {

        public static string JsonData(int startIndex, string country)
        {
            string data = string.Empty;
            int size = 20;
            System.Collections.Generic.List<Model> list = new System.Collections.Generic.List<Model>();
            for (int i = 0; i < size; i++)
            {
                Model o = new Model();
                int clientIndex = startIndex + i;
                o.Content = clientIndex + CreateDemoContent();
                o.Id = clientIndex;
                o.Country = country;
                o.TimeIndex = DateTime.Now.Millisecond;
                list.Add(o);
            }

            data = JsonConvert.SerializeObject(list);
            return data;
        }
        public static string GetEvent(int startIndex, int timeIndex, int pageSize, string country)
        {
            SqliteDB.Class1 c = new SqliteDB.Class1();
            string data = string.Empty;

            System.Collections.Generic.List<HEvent> list = c.Get(timeIndex, pageSize, country);
            for (int i = 0; i < list.Count; i++)
            {
                list[i].Id = startIndex + i;
            }
            data = JsonConvert.SerializeObject(list);
            return data;
        }

        private static string CreateDemoContent()
        {
            Random r = new Random(10);
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            for (int i = 1; i <= 20; i++)
            {
                sb.Append("测试的文本");
            }
            return sb.ToString();
        }


    }
}
