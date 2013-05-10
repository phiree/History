using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataTract
{
    public interface ITract
    {
        List<History.HEvent> Tract(string timeIndexRegExp, string content,string country);
    }
}
