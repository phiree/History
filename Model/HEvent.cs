using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace History
{
    public class HEvent
    {
        public int TimeIndex
        {
            get
            {
                return Year * 366 + Month * 12 + Date;
            }

        }

        public int Year;
        public int Month;
        public int Date;
        public string Content;
        public int Id;
        public string Country;
        public string Source;
    }
}
