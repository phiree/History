<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Newtonsoft.Json;
public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        int startIndex, timeIndex,pageSize;
        string strtimeIndex = context.Request["timeIndex"];
        string strIndex=context.Request["pageIndex"];
        string strpageSize = context.Request["pageSize"];
        int.TryParse(strIndex, out startIndex);
        int.TryParse(strtimeIndex, out timeIndex);
        int.TryParse(strpageSize, out pageSize);
        string country = context.Request["country"];
        
        context.Response.ContentType = "text/json";
        timeIndex = int.MinValue;
        string result = History.Bll.GetEvent(startIndex, timeIndex, pageSize, country);
        context.Response.Write(result);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }


}