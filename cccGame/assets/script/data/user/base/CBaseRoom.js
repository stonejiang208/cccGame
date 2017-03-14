/**
 * Created by Class on 2017/3/14.
 */
require("../../core/Core");
require("./CBaseUserData");
Class({
    ClassName:"Game.Data.CBaseRoom",
    Base:"Game.Data.CBaseUserData",
    factoryValue:{
        get:function(){

            return {};
        }
    },
    Roomer:null,
    PersonClass:null,
    m_pCurrentCount:0,
    IsFull:{
        get:function()
        {
            return this.m_pCurrentCount == this.MaxCount;
        }
    },
    addPerson:function(data)
    {
        var seateid = data.Seat;
        var p = null;
        if(!this.Value.hasOwnProperty(seateid))
        {
            p = new this.PersonClass();
            p.PersonInfo = data;
            if(!this.Roomer)
            {
                this.Roomer = data.userid;
            }
            this.Value[seateid] = p;
            this.m_pCurrentCount++;
        }
        this.OldValue = [seateid,Game.Const.CBaseUserData.ChangeType.Add];
        this.Notify();
        return p;

    },
    removePerson:function(seateid,newRoomer)
    {
        var p = this.Value[seateid];
        if(newRoomer)
        {
            this.Roomer = newRoomer;
        }
        if(p)
        {
           delete this.Value[seateid];
            p.$Dispose();
            this.m_pCurrentCount--;
        }

        this.OldValue = [seateid,Game.Const.CBaseUserData.ChangeType.REMOTE];
        this.Notify();

    },
    Clear:function()
    {
        for(var key in this.Value)
        {
            var temp = this.Value[key];
            temp.Clear();
            temp.$Dispose();
        }
        this.Roomer = undefined;
        this.m_pCurrentCount = 0;
        Game.Data.CBaseUserData.prototype.ctor.apply(this,arguments);
    }
})