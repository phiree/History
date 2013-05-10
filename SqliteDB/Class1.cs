using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SQLite;
namespace SqliteDB
{
    public class Class1
    {
        SQLiteConnection conn = new SQLiteConnection(@"Data Source=F:\PhireeCode\History\web\db\db.db3");

        public void Insert(History.HEvent e)
        {

            SQLiteCommand comm = new SQLiteCommand("insert into HEvent values(@timeindex,@year,@month,@date,@content,@country)");
            comm.Parameters.Add(new SQLiteParameter("timeindex", e.TimeIndex));
            comm.Parameters.Add(new SQLiteParameter("year", e.Year));
            comm.Parameters.Add(new SQLiteParameter("month", e.Month));
            comm.Parameters.Add(new SQLiteParameter("date", e.Date));
            comm.Parameters.Add(new SQLiteParameter("content", e.Content));
            comm.Parameters.Add(new SQLiteParameter("country", e.Country));
            comm.Connection = conn;
            conn.Open();
            comm.ExecuteNonQuery();
            conn.Close();
        }
        private List<History.HEvent> Get(string query)
        {
            List<History.HEvent> events = new List<History.HEvent>();
            SQLiteCommand comm = new SQLiteCommand(query);

            comm.Connection = conn;
            conn.Open();
            SQLiteDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                History.HEvent e = new History.HEvent();
                e.Year = (int)reader["year"];
                e.Month = (int)reader["month"];
                e.Date = (int)reader["date"];
                e.Content = (string)reader["content"];
                events.Add(e);
            }
            conn.Close();
            return events;
        }
        /// <summary>
        /// 1 
        /// </summary>
        /// <returns></returns>
        public List<History.HEvent> Get(int timeIndex, int pageSize, string country)
        {

            string query = "select  * from hevent where country='"+country+"' and timeIndex>=" + timeIndex+" limit "+ pageSize;

            return Get(query);
        }
    }
}
