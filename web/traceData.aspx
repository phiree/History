<%@ Page Language="C#" AutoEventWireup="true" CodeFile="traceData.aspx.cs" ValidateRequest="false" Inherits="traceData" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        正则表达式:
        <asp:TextBox runat="server" ID="tbxRegExp" Width="693px"></asp:TextBox>
    </div>
    <div>
        <asp:TextBox runat="server" ID="tbxContent" TextMode="MultiLine" Height="33px" 
            Width="733px"></asp:TextBox>
    </div>
    <div>
        国家:
        <asp:TextBox runat="server" ID="tbxCountry" TextMode="MultiLine"></asp:TextBox>
    </div>
    <div>
        <asp:Button runat="server" OnClick="btnSaveClick" Text="开始整理" />
    </div>
    </form>
</body>
</html>
