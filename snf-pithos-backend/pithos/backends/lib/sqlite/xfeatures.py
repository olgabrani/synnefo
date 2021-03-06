# Copyright (C) 2010-2014 GRNET S.A.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from collections import defaultdict

from dbworker import DBWorker


class XFeatures(DBWorker):
    """XFeatures are path properties that allow non-nested
       inheritance patterns. Currently used for storing permissions.
    """

    def __init__(self, **params):
        DBWorker.__init__(self, **params)
        execute = self.execute

        execute(""" pragma foreign_keys = on """)

        execute(""" create table if not exists xfeatures
                          ( feature_id integer primary key,
                            path       text ) """)
        execute(""" create unique index if not exists idx_features_path
                    on xfeatures(path) """)

        execute(""" create table if not exists xfeaturevals
                          ( feature_id integer,
                            key        integer,
                            value      text,
                            primary key (feature_id, key, value)
                            foreign key (feature_id) references
                                xfeatures(feature_id)
                            on delete cascade ) """)

#     def xfeature_inherit(self, path):
#         """Return the (path, feature) inherited by the path, or None."""
#
#         q = ("select path, feature_id from xfeatures "
#              "where path <= ? "
#              "and ? like path || '%' " # XXX: Escape like...
#              "order by path desc")
#         self.execute(q, (path, path))
#         return self.fetchall()

    def xfeature_get(self, path):
        """Return feature for path."""

        q = "select feature_id from xfeatures where path = ?"
        self.execute(q, (path,))
        r = self.fetchone()
        if r is not None:
            return r[0]
        return None

    def xfeature_get_bulk(self, paths):
        """Return features for paths."""

        paths = list(set(paths))
        q = ("select feature_id, path from xfeatures "
             "where path in (%s) "
             "order by path") % ','.join('?' for _ in paths)
        self.execute(q, paths)
        rows = self.fetchall()
        if rows:
            return rows
        return None

    def xfeature_create(self, path):
        """Create and return a feature for path.
           If the path has a feature, return it.
        """

        feature = self.xfeature_get(path)
        if feature is not None:
            return feature
        q = "insert into xfeatures (path) values (?)"
        id = self.execute(q, (path,)).lastrowid
        return id

    def xfeature_destroy(self, path):
        """Destroy a feature and all its key, value pairs."""

        q = "delete from xfeatures where path = ?"
        self.execute(q, (path,))

    def xfeature_destroy_bulk(self, paths):
        """Destroy features and all their key, value pairs."""

        placeholders = ','.join('?' for path in paths)
        q = "delete from xfeatures where path in (%s)" % placeholders
        self.execute(q, paths)

    def feature_dict(self, feature):
        """Return a dict mapping keys to list of values for feature."""

        q = "select key, value from xfeaturevals where feature_id = ?"
        self.execute(q, (feature,))
        d = defaultdict(list)
        for key, value in self.fetchall():
            d[key].append(value)
        return d

    def feature_set(self, feature, key, value):
        """Associate a key, value pair with a feature."""

        q = ("insert or ignore into xfeaturevals (feature_id, key, value) "
             "values (?, ?, ?)")
        self.execute(q, (feature, key, value))

    def feature_setmany(self, feature, key, values):
        """Associate the given key, and values with a feature."""

        q = ("insert or ignore into xfeaturevals (feature_id, key, value) "
             "values (?, ?, ?)")
        self.executemany(q, ((feature, key, v) for v in values))

    def feature_unset(self, feature, key, value):
        """Disassociate a key, value pair from a feature."""

        q = ("delete from xfeaturevals where "
             "feature_id = ? and key = ? and value = ?")
        self.execute(q, (feature, key, value))

    def feature_unsetmany(self, feature, key, values):
        """Disassociate the key for the values given, from a feature."""

        q = ("delete from xfeaturevals where "
             "feature_id = ? and key = ? and value = ?")
        self.executemany(q, ((feature, key, v) for v in values))

    def feature_get(self, feature, key):
        """Return the list of values for a key of a feature."""

        q = "select value from xfeaturevals where feature_id = ? and key = ?"
        self.execute(q, (feature, key))
        return [r[0] for r in self.fetchall()]

    def feature_clear(self, feature, key):
        """Delete all key, value pairs for a key of a feature."""

        q = "delete from xfeaturevals where feature_id = ? and key = ?"
        self.execute(q, (feature, key))
