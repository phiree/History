using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataTract;
using System.IO;
namespace History
{
  public  class Tract
    {

      
      public static void Trackdata(string regExp,string content,string country)
      {
          if (File.Exists(content))
          {
              content = File.ReadAllText(content,Encoding.Default);
          }
          
          SqliteDB.Class1 dsqlDb = new SqliteDB.Class1();
          ZZTJTract.Class1 c = new ZZTJTract.Class1();
          System.Collections.Generic.List<HEvent> events= c.Tract(regExp, content,country);

          foreach (HEvent e in events)
          {
              dsqlDb.Insert(e);
          }
      }
      //BMK
    }
}
